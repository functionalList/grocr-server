DROP TABLE userPurchases;
DROP TABLE recipeLists;
DROP TABLE recipes; 
DROP TABLE items; 
DROP TABLE users;  

CREATE TABLE items (
  ID int AUTO_INCREMENT, 
  name VARCHAR(255) NOT NULL UNIQUE, 
  PRIMARY KEY (ID)
);
CREATE TABLE users (
  ID int AUTO_INCREMENT, 
  name VARCHAR(255) NOT NULL, 
  PRIMARY KEY (ID)
);
CREATE TABLE userPurchases (
  itemID int NOT NULL,
  userID int NOT NULL,
  total int DEFAULT 1,
  PRIMARY KEY (itemID, userID),
  FOREIGN KEY (itemID) REFERENCES items (ID),
  FOREIGN KEY (userID) REFERENCES users (ID)
);

Create Table recipes (
  ID int AUTO_INCREMENT, 
  name VARCHAR(255) NOT NULL, 
  creatorID int NOT NULL,
  Primary Key (ID),
  FOREIGN KEY (creatorID) REFERENCES users (ID)
);

Create Table recipeLists (
  recipeID int not null,
  itemID int not null,
  PRIMARY KEY (recipeID, itemID),
  FOREIGN KEY (recipeID) REFERENCES recipes (ID),
  FOREIGN KEY (itemID) REFERENCES items (ID)
);

INSERT INTO items (name) VALUES ('carrot');
SET @item = LAST_INSERT_ID();
INSERT INTO users (name) VALUES ('philip');
SET @user = LAST_INSERT_ID();
Insert Into userPurchases (itemID, userID) values (@item, @user);

INSERT INTO users (name) VALUES ('patrick');
SET @user = LAST_INSERT_ID();
INSERT INTO items (name) VALUES ('squash');
SET @item = LAST_INSERT_ID();
Insert Into userPurchases (itemID, userID) values (@item, @user);
Insert Into userPurchases (itemID, userID) values (@item, @user)
  On Duplicate Key Update
    total=total+1;
Insert Into userPurchases (itemID, userID) values (@item, @user)
  On Duplicate Key Update
    total=total+1;

Select items.name, users.name as `user`, userPurchases.total from userPurchases 
Join items on items.ID = userPurchases.itemID 
Join users on users.ID = userPurchases.userID
Where users.name = 'Patrick';
