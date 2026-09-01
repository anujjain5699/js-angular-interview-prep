/*
Interview Question:
You are given a table of products where the category is populated only for some rows and NULL for others.
Write a SQL query to carry forward the previous non-null category to all following rows until the next non-null category appears.
Return the rows in their original order and keep the row sequence intact.
*/

-- Create Table
CREATE TABLE products (
    category VARCHAR(50),
    brand_name VARCHAR(50)
);

-- Insert Records
INSERT INTO products (category, brand_name)
VALUES 
('Beverages', 'Coca Cola'),
(NULL, 'Pepsi'),
(NULL, 'Sprite'),
(NULL, 'Fanta'),
('Snacks', 'Lays'),
(NULL, 'Doritos'),
(NULL, 'Kurkure');

/*
Data after insert:
category   | brand_name
-----------+----------------
Beverages  | Coca Cola
NULL       | Pepsi
NULL       | Sprite
NULL       | Fanta
Snacks     | Lays
NULL       | Doritos
NULL       | Kurkure
*/

-- Query to fill missing category values with the previous non-null category
WITH cte1 AS (
    SELECT
        category,
        brand_name,
        ROW_NUMBER() OVER (ORDER BY NULL) AS current_rn
    FROM products
),
cte2 AS (
    SELECT
        *,
        LEAD(current_rn, 1) OVER (ORDER BY current_rn) AS next_rn
    FROM cte1
    WHERE category IS NOT NULL
)
SELECT
    cte2.category,
    cte1.brand_name
FROM cte1
JOIN cte2
  ON cte1.current_rn >= cte2.current_rn
 AND (
      cte1.current_rn < cte2.next_rn
      OR cte2.next_rn IS NULL
 )
ORDER BY cte1.current_rn;

/*
Expected Result Table:
category   | brand_name
-----------+----------------
Beverages  | Coca Cola
Beverages  | Pepsi
Beverages  | Sprite
Beverages  | Fanta
Snacks     | Lays
Snacks     | Doritos
Snacks     | Kurkure
*/
