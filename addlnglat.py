import csv
import requests
#csv_data = csv.reader(open('csvfile.csv', 'r'))
#csv_new = csv.writer(open('csvfile_new.csv', 'w'))

addresses = {}
latlngDict = {}

def fullAddress(block, street, post):
    #print(type(int(float(block))))
    #print(str(int(float(block))), street, post)
    fullAddress = str(int(float(block)))+' '+street+' '+post + " San Diego California"
    fullAddress.replace("  ", " ")
    fullAddress.replace("   ", " ")
    fullAddress.replace("    ", " ")

    return fullAddress


#first add all addresses to hash map w/ case_number as key
#make sure to seek(0) after so we can read for 3rd step
with open('hate_crimes_datasd.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if len(row['block']) < 1:
            continue
        add = fullAddress(row['block'],row['street'],row['type'])

        addresses[row['case_number']] = add

    csvfile.seek(0)

#make another hashmap of lat,lng tuples with case_number as key
for key in addresses:
    nurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+addresses[key]+'.json?'
    #print(nurl)
    try: 
        r = requests.get(nurl, timeout=2)
    except ReadTimeoutError:
        print("took too long, moving on")

    try:
        latlng = r.json()['features'][0]['center']
        latlngDict[key] = latlng
    except KeyError:
        pass

    

#now insert all rows with new lat/lng coordinates from hash map

with open('hate_crimes_datasd.csv', newline='') as csvfile, open('out.csv', 'w', newline='') as csv_out:
    reader = csv.DictReader(csvfile)

    fieldNames = ['case_number', 'date', 'time', 
                  'date_time', 'crime', 'address', 
                  'weapon', 'motivation', 'number_of_suspects',
                  'victim_count', 'victim_other', 'injury', 'suspect_race_0',
                  'suspect_race_1','suspect_race_2', 'suspect_sex_0',
                  'suspect_sex_1','suspect_sex_2','victim_race_0',
                  'victim_race_1','victim_race_2','victim_race_3',
                  'victim_sex_0','victim_sex_1','victim_sex_2',
                  'victim_sex_3', 'lng', 'lat']
    
    writer = csv.DictWriter(csv_out, fieldnames=fieldNames)
    

    writer.writeheader()

    for row in reader:
        if len(row['block']) < 1:
            continue
        add = fullAddress(row['block'],row['street'],row['type'])

        try:
            writer.writerow({'case_number': row['case_number'], 'date': row['date'], 'time':row['time'], 
                    'date_time': row['date_time'], 'crime': row['crime'], 'address':add,
                    'weapon':row['weapon'], 'motivation':row['motivation'], 'number_of_suspects':row['number_of_suspects'],
                    'victim_count':row['victim_count'], 'victim_other':row['victim_other'], 'injury':row['injury'], 'suspect_race_0':row['suspect_race_0'],
                    'suspect_race_1':row['suspect_race_1'],'suspect_race_2':row['suspect_race_2'], 'suspect_sex_0':row['suspect_sex_0'],
                    'suspect_sex_1':row['suspect_sex_1'],'suspect_sex_2':row['suspect_sex_2'],'victim_race_0':row['victim_race_0'],
                    'victim_race_1':row['victim_race_1'],'victim_race_2':row['victim_race_2'],'victim_race_3':row['victim_race_3'],
                    'victim_sex_0':row['victim_sex_0'],'victim_sex_1':row['victim_sex_1'],'victim_sex_2':row['victim_sex_2'],
                    'victim_sex_3':row['victim_sex_3'], 'lat': latlngDict[row['case_number']][1], 'lng': latlngDict[row['case_number']][0]
            })
        except KeyError:
            pass
        
        




