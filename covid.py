#!/usr/bin/env python3

import csv
import json
import time
import schedule
import signal
import sys
from shutil import rmtree

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

def get_data():
    dirname = os.getcwd() + '/data'
    remove_old(dirname)
    print('Cloning into %s' % dirname)
    git.Repo.clone_from('https://github.com/CSSEGISandData/COVID-19.git', dirname, progress = Progress())
    mypath = dirname + '/csse_covid_19_data/csse_covid_19_daily_reports/'
    os.remove(mypath + '/README.md')
    file_list = [f for f in listdir(mypath) if isfile(join(mypath, f))]

    latestfile = max(file_list)
    create_new_json(latestfile, mypath)

def create_new_json(latestfile, mypath):
    data = {}
    file = mypath + '/' + latestfile

    try:
        with open(file) as csvfile:
            csvreader = csv.DictReader(csvfile)
            for rows in csvreader:
                if rows["Country_Region"] not in data:
                    data[rows["Country_Region"]] = {}
                if rows["Province_State"] not in data[rows["Country_Region"]]:
                    data[rows["Country_Region"]][rows["Province_State"]] = {}
                data[rows["Country_Region"]][rows["Province_State"]]["Confirmed"] = rows["Confirmed"]
                data[rows["Country_Region"]][rows["Province_State"]]["Deaths"] = rows["Deaths"]
                data[rows["Country_Region"]][rows["Province_State"]]["Recovered"] = rows["Recovered"]
                data[rows["Country_Region"]][rows["Province_State"]]["Latitude"] = rows["Lat"]
                data[rows["Country_Region"]][rows["Province_State"]]["Longitude"] = rows["Long_"]
                data[rows["Country_Region"]][rows["Province_State"]]["Incidence_Rate"] = rows["Incidence_Rate"]
                data[rows["Country_Region"]][rows["Province_State"]]["Case-Fatality_Ratio"] = rows["Case-Fatality_Ratio"]
                data[rows["Country_Region"]][rows["Province_State"]]["Last_update"] = rows["Last_Update"]
    except OSError:
        die('failed to open file', file = file)

    try:
        jsonFilePath = 'last_data.json'
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
