create table tb_char_list(id int(11) primary key auto_increment,
  icharacter varchar(4), foreward varchar(4), body varchar(4), afterward varchar(4),
  front_combine varchar(4), after_combine varchar(4));

create table tb_word_statistics (id int(11) auto_increment,
  word_name varchar(30) primary key not null, word_length int(10) not null, occurrence_times int(10) not null,
  index(id));