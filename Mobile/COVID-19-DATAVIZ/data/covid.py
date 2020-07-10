#!/usr/bin/env python3

import csv
import json
import time
from shutil import rmtree

import os
from os import listdir
from os.path import isfile, join

import git
from git import RemoteProgress

jsonFilePath = 'last_data.json'
dirname = os.getcwd() + '/data'

class CloneProgress(RemoteProgress):
    def update(self, op_code, cur_count, max_count=None, message=''):
        if message:
            print(message)

rmtree(dirname, ignore_errors=True, onerror=None)
print('Cloning into %s' % dirname)
git.Repo.clone_from('https://github.com/CSSEGISandData/COVID-19.git', dirname)

mypath = dirname + '/csse_covid_19_data/csse_covid_19_daily_reports/'
os.remove(mypath + '/README.md')
file_list = [f for f in listdir(mypath) if isfile(join(mypath, f))]

latestfile = max(file_list)

data = {}

with open(mypath + '/' + latestfile) as csvfile:
  csvreader = csv.DictReader(csvfile)
  for rows in csvreader:
    if rows["Country_Region"] not in data:
      data[rows["Country_Region"]] = {}
    if rows["Province_State"] not in data[rows["Country_Region"]]:
      data[rows["Country_Region"]][rows["Province_State"]] = {}
    data[rows["Country_Region"]][rows["Province_State"]]["Confirmed"] = rows["Confirmed"]
    data[rows["Country_Region"]][rows["Province_State"]]["Deaths"] = rows["Deaths"]
    data[rows["Country_Region"]][rows["Province_State"]]["Recovered"] = rows["Recovered"]
    data[rows["Country_Region"]][rows["Province_State"]]["Last_update"] = rows["Last_Update"]

with open(jsonFilePath, 'w') as jsonfile:
  jsonfile.write(json.dumps(data, indent = 4))
