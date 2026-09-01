/*
Interview Question:
Write a SQL query to reverse the ProductIDs within each Category while keeping the Product names in their original order.
In other words, map the first product's name to the last product's ID within the same category, the second to the second-to-last, and so on.
*/

-- DDL: Create Table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    Product VARCHAR(50),
    Category VARCHAR(50)
);

-- DML: Insert Data
INSERT INTO Products (ProductID, Product, Category) VALUES
(101, 'Gaming Laptop', 'Electronics'),
(102, 'iPhone', 'Electronics'),
(108, 'iPad', 'Electronics'),
(104, 'Scanner', 'Electronics'),
(105, 'Bluetooth Earbuds', 'Accessories'),
(106, 'Fitness Band', 'Accessories'),
(107, 'Mechanical Keyboard', 'Accessories'),
(103, 'Wireless Mouse', 'Accessories'),
(109, 'LED Monitor', 'Accessories');

-- Query using CTE and Window Functions
WITH cte1 AS (
    SELECT 
        *, 
        ROW_NUMBER() OVER(PARTITION BY category) AS rn 
    FROM products
),
cte2 AS (
    SELECT 
        *, 
        ROW_NUMBER() OVER(PARTITION BY category ORDER BY rn DESC) AS c_rn 
    FROM cte1
)
SELECT 
    cte2.productid, 
    cte1.product,
    cte1.category 
FROM cte1 
JOIN cte2 ON cte1.rn = cte2.c_rn AND cte1.category = cte2.category 
ORDER BY cte1.category DESC;

/* 
Raw Table Data (After Insert):
ProductID | Product              | Category
----------+----------------------+-------------
101       | Gaming Laptop        | Electronics
102       | iPhone               | Electronics
108       | iPad                 | Electronics
104       | Scanner              | Electronics
105       | Bluetooth Earbuds    | Accessories
106       | Fitness Band         | Accessories
107       | Mechanical Keyboard  | Accessories
103       | Wireless Mouse       | Accessories
109       | LED Monitor          | Accessories

Expected Result:
ProductID | Product              | Category
----------+----------------------+-------------
104       | Gaming Laptop        | Electronics
108       | iPhone               | Electronics
102       | iPad                 | Electronics
101       | Scanner              | Electronics
109       | Bluetooth Earbuds    | Accessories
103       | Fitness Band         | Accessories
107       | Mechanical Keyboard  | Accessories
106       | Wireless Mouse       | Accessories
105       | LED Monitor          | Accessories
*/
