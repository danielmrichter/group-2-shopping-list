-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

-- Database Name:  fs-react-shopping

CREATE TABLE "shoppingList"(
	"id" SERIAL PRIMARY KEY,
	"itemName" VARCHAR NOT NULL,
	"itemQuantity" FLOAT(8) NOT NULL,
	"itemUnit" VARCHAR,
	"isBought" BOOLEAN DEFAULT FALSE);
	

INSERT INTO "shoppingList"
("itemName", "itemQuantity", "itemUnit")
	VALUES
	('bread', 1, 'loaf'),
	('cheese', 2, 'wheel'),
	('milk', 5, 'carton');