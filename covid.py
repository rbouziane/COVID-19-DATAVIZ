#!/usr/bin/env python3

import csv
import json
import time
import schedule
import signal
import sys
from shutil import rmtree

from multiprocessing import Process

import os
from os import listdir
from os.path import isfile, join

import git
from git import RemoteProgress

class Progress(RemoteProgress):
    def update(self, op_code, cur_count, max_count=None, message=''):
        print (self._cur_line)

def die(*args, **kwargs):
    file = kwargs.pop('file', sys.argv[0])
    print(file + ':', *args, **kwargs, file=sys.stderr)
    sys.exit(84)

def remove_old(dirname):
    rmtree(dirname, ignore_errors=True, onerror=None)

def start_process(latestfile, mypath, file_list):
    print("Starting Process.")
    p1 = Process(target = create_new_json(latestfile, mypath, jsonFilePath = 'last_data.json'))
    p1.start()
    p2 = Process(target = data_graphical(file_list, mypath, latestfile, jsonFilePath = 'data_graphical.json'))
    p2.start()
    p1.join()
    p2.join()

def get_data():
    dirname = os.getcwd() + '/data'
    remove_old(dirname)
    print('Cloning into %s' % dirname)
    git.Repo.clone_from('https://github.com/CSSEGISandData/COVID-19.git', dirname, progress = Progress())
    mypath = dirname + '/csse_covid_19_data/csse_covid_19_daily_reports/'
    os.remove(mypath + '/README.md')
    os.remove(mypath + '/.gitignore')
    file_list = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    file_list.sort()

    latestfile = max(file_list)

    start_process(latestfile, mypath, file_list)
    print("End of tasks.")

def data_graphical(file_list, mypath, latestfile, jsonFilePath):
    print("Starting graphical data filter.")
    data = {}
    for file in file_list:
        try:
            with open(mypath + '/' + file) as current:
                date = os.path.splitext(file)[0]
                data[date] = {}
                data[date]["Total_Confirmed"] = 0
                data[date]["Total_Deaths"] = 0
                csvreader = csv.DictReader(current)
                for rows in csvreader:
                    if "Country/Region" in rows:
                        if rows["Country/Region"] not in data[date]:
                            rows = check_row_graph(rows)
                            if rows["Country/Region"] == "Mainland China":
                                if not "China" in data[date]:
                                    data[date]["China"] = {}
                                    data[date]["China"]["Confirmed"] = 0
                                    data[date]["China"]["Deaths"] = 0
                                data[date]["China"]["Confirmed"] += int(rows["Confirmed"])
                                data[date]["Total_Confirmed"] += int(rows["Confirmed"])
                                data[date]["China"]["Deaths"] += int(rows["Deaths"])
                                data[date]["Total_Deaths"] += int(rows["Deaths"])
                            else:
                                data[date][rows["Country/Region"]] = {}
                                data[date][rows["Country/Region"]]["Confirmed"] = 0
                                data[date][rows["Country/Region"]]["Deaths"] = 0
                                data[date][rows["Country/Region"]]["Confirmed"] += int(rows["Confirmed"])
                                data[date]["Total_Confirmed"] += int(rows["Confirmed"])
                                data[date][rows["Country/Region"]]["Deaths"] += int(rows["Deaths"])
                                data[date]["Total_Deaths"] += int(rows["Deaths"])
                    else:
                        if rows["Country_Region"] not in data[date]:
                            data[date][rows["Country_Region"]] = {}
                            data[date][rows["Country_Region"]]["Confirmed"] = 0
                            data[date][rows["Country_Region"]]["Deaths"] = 0
                        data[date][rows["Country_Region"]]["Confirmed"] += int(rows["Confirmed"])
                        data[date]["Total_Confirmed"] += int(rows["Confirmed"])
                        data[date][rows["Country_Region"]]["Deaths"] += int(rows["Deaths"])
                        data[date]["Total_Deaths"] += int(rows["Deaths"])
        except OSError:
            die('failed to open file', file = file)

    try:
        with open(jsonFilePath, 'w') as jsonfile:
            jsonfile.write(json.dumps(data, indent = 4))
    except OSError:
        die('failed to open file', file = jsonFilePath)

def check_row_graph(rows):
    rows["Deaths"] = rows["Deaths"] if rows["Deaths"] != "" else 0
    rows["Confirmed"] = rows["Confirmed"] if rows["Confirmed"] != "" else 0
    return rows

def check_row_actual(rows):
    rows["Deaths"] = rows["Deaths"] if rows["Deaths"] != "" else 0
    rows["Confirmed"] = rows["Confirmed"] if rows["Confirmed"] != "" else 0
    rows["Recovered"] = rows["Recovered"] if rows["Recovered"] != "" else 0
    rows["Lat"] = rows["Lat"] if rows["Lat"] != "" else 0
    rows["Long_"] = rows["Long_"] if rows["Long_"] != "" else 0
    rows["Incidence_Rate"] = rows["Incidence_Rate"] if rows["Incidence_Rate"] != "" else 0
    rows["Case-Fatality_Ratio"] = rows["Case-Fatality_Ratio"] if rows["Case-Fatality_Ratio"] != "" else 0
    return rows

def create_new_json(latestfile, mypath, jsonFilePath):
    print("Starting recent data filter.")
    data = {}
    file = mypath + '/' + latestfile

    try:
        with open(file) as csvfile:
            csvreader = csv.DictReader(csvfile)
            for rows in csvreader:
                rows = check_row_actual(rows)
                if rows["Country_Region"] not in data:
                    data[rows["Country_Region"]] = {}
                if rows["Province_State"] not in data[rows["Country_Region"]]:
                    data[rows["Country_Region"]][rows["Province_State"]] = {}
                    data[rows["Country_Region"]][rows["Province_State"]]["Confirmed"] = 0
                    data[rows["Country_Region"]][rows["Province_State"]]["Deaths"] = 0
                    data[rows["Country_Region"]][rows["Province_State"]]["Recovered"] = 0

                data[rows["Country_Region"]][rows["Province_State"]]["Confirmed"] += int(rows["Confirmed"])
                data[rows["Country_Region"]][rows["Province_State"]]["Deaths"] += int(rows["Deaths"])
                data[rows["Country_Region"]][rows["Province_State"]]["Recovered"] += int(rows["Recovered"])
                data[rows["Country_Region"]][rows["Province_State"]]["Latitude"] = float(rows["Lat"])
                data[rows["Country_Region"]][rows["Province_State"]]["Longitude"] = float(rows["Long_"])
                data[rows["Country_Region"]][rows["Province_State"]]["Incidence_Rate"] = float(rows["Incidence_Rate"])
                data[rows["Country_Region"]][rows["Province_State"]]["Case-Fatality_Ratio"] = float(rows["Case-Fatality_Ratio"])
                data[rows["Country_Region"]][rows["Province_State"]]["Last_update"] = rows["Last_Update"]
    except OSError:
        die('failed to open file', file = file)

    try:
        with open(jsonFilePath, 'w') as jsonfile:
            jsonfile.write(json.dumps(data, indent = 4))
    except OSError:
        die('failed to open file', file = jsonFilePath)

def config():
    schedule.every().day.at("05:00").do(get_data)
    signal.signal(signal.SIGINT, signal.default_int_handler)

def main(args):
    if '-h' in args:
        print('USAGE')
        print('\t%s [-update | -h]' % sys.argv[0])
        print('')
        print('DESCRIPTION')
        print('\t-update\tget data only once and immediatly')
        print('\t-h\tdisplay help')
        return
    if '-update' in args:
        get_data()
        return
    config()
    while True:
        try:
            schedule.run_pending()
            time.sleep(1)
        except KeyboardInterrupt:
            print ("\nCaught ^C \nExiting gracefully")
            break
        except ValueError:
            die(ValueError)

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]) or 0)
