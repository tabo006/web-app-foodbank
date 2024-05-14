create table item
	(itName	varchar(40) not null,
	 category		varchar(40) not null,
     itStatus		varchar(40) not null,
	 max            INT not null,
	 description 	varchar(200),
	 availability varchar(40),
	 primary key (itName)
	);

create table form
	(formID	serial UNIQUE,
	 fStatus		varchar(40) not null,
     fName		varchar(40) not null,
	 lName		varchar(40) not null,
	 vName		varchar(40),
     cNotes varchar(150), 
     vNotes varchar(150), 
     aNotes varchar(150), 
     date_form	timestamp,
	 primary key (date_form, fName, lName)
	);

create table form_item
	(itName	varchar(40) not null,
	 formID		INT not null,
     amount	    INT not null,
	 selection varchar(100),
	 alternative varchar(100),
	 primary key (itName,formID),
     foreign key (itName) references item(itName)
            on delete cascade
            on update cascade,
    foreign key (formID) references form(formID)
            on delete cascade
            on update cascade
	)

create table account
	
	(type		varchar(40) not null,
	username	varchar(40) not null,
	 pwd		varchar(40) not null,
	 primary key (type)
	);

create table foodbank_status
	(fbstatus	varchar(40) not null,
	 primary key (fbstatus)
	);

