create table crimes (
    case_number int,
    date date,
    year int,
    month int,
    time time,
    date_time datetime,
    crime_code varchar(255),
    crime varchar(255),
    block int, 
    street varchar(255),
    type varchar(50),
    beat int,
    command varchar(50),
    weapon varchar(100),
    motivation varchar(50),
    number_of_suspects varchar(20),
    suspect varchar(50),
    victim_count int,
    victim_other varchar(50),
    injury varchar(50),
    suspect_race_0 varchar(50),
    suspect_race_1 varchar(50),
    suspect_race_2 varchar(50),
    suspect_sex_0 varchar(50),
    suspect_sex_1 varchar(50),
    suspect_sex_2 varchar(50),
    victim_race_0 varchar(50),
    victim_race_1 varchar(50),
    victim_race_2 varchar(50),
    victim_race_3 varchar(50),
    victim_sex_0 varchar(50),
    victim_sex_1 varchar(50),
    victim_sex_2 varchar(50),
    victim_sex_3 varchar(50)
)

create table newcrimes (
    case_number int,
    date date,
    time time,
    date_time datetime,
    crime varchar(255),
    address varchar(255),
    weapon varchar(100),
    motivation varchar(50),
    number_of_suspects varchar(20),
    victim_count int,
    victim_other varchar(50),
    injury varchar(50),
    suspect_race_0 varchar(50),
    suspect_race_1 varchar(50),
    suspect_race_2 varchar(50),
    suspect_sex_0 varchar(50),
    suspect_sex_1 varchar(50),
    suspect_sex_2 varchar(50),
    victim_race_0 varchar(50),
    victim_race_1 varchar(50),
    victim_race_2 varchar(50),
    victim_race_3 varchar(50),
    victim_sex_0 varchar(50),
    victim_sex_1 varchar(50),
    victim_sex_2 varchar(50),
    victim_sex_3 varchar(50),
    lng varchar(255),
    lat varchar(255)
)

load data local infile '/Users/pat/SWE/out.csv'
into table `newcrimes`
fields optionally enclosed by '"' terminated by ','
lines terminated by '\n'
ignore 1 lines;


mysql --local_infile=1 -u mytestuser -ppassword cgcorrelation

mysql --local_infile=1 -u mytestuser -p My6$Password cgcorrelation

mysql -u mytestuser -p --local-infile cgcorrelation -A

mysql -u mytestuser -p --local-infile cgcorrelation -A