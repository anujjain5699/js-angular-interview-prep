-- Second Highest Salary
--
-- You are an HR analyst at a technology company. Write a query to find the
-- second highest salary among all employees.
--
-- If multiple employees have the second highest salary, return that salary
-- only once.

-- Employee schema:
--
-- column_name   | type      | description
-- --------------+-----------+-------------------------------
-- employee_id   | integer   | Unique employee ID
-- name          | string    | Employee name
-- salary        | integer   | Employee salary
-- department_id | integer   | Department ID
-- manager_id    | integer   | Manager ID

-- Example input:
--
-- employee_id | name              | salary | department_id | manager_id
-- ------------+-------------------+--------+---------------+-----------
-- 1           | Emma Thompson     | 3800   | 1             | 6
-- 2           | Daniel Rodriguez  | 2230   | 1             | 7
-- 3           | Olivia Smith      | 2000   | 1             | 8

-- Expected output:
--
-- second_highest_salary
-- ---------------------
-- 2230
--
-- The second highest salary is 2230.

-- Edge cases:
--
-- 1. Duplicate highest salary
--
-- employee_id | name             | salary
-- ------------+------------------+--------
-- 4           | Noah Williams    | 5000
-- 5           | Sophia Brown     | 5000
-- 6           | Liam Davis       | 4500
-- 7           | Mia Wilson       | 3000
--
-- Expected second highest salary: 4500
-- Both employees earning 5000 share rank 1. DENSE_RANK() gives 4500 rank 2.

-- 2. Duplicate second-highest salary
--
-- employee_id | name             | salary
-- ------------+------------------+--------
-- 8           | James Moore      | 6000
-- 9           | Amelia Taylor    | 5500
-- 10          | Benjamin Thomas  | 5500
-- 11          | Harper Jackson   | 4000
--
-- Expected second highest salary: 5500, returned only once
-- DISTINCT removes the duplicate 5500 result.

-- 3. Only one distinct salary
--
-- employee_id | name             | salary
-- ------------+------------------+--------
-- 12          | Ethan White      | 7000
-- 13          | Ella Harris      | 7000
--
-- Expected result: no row, because a second distinct salary does not exist.

WITH ranked_salaries AS (
    SELECT
        salary,
        DENSE_RANK() OVER (
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employee
)
SELECT DISTINCT
    salary AS second_highest_salary
FROM ranked_salaries
WHERE salary_rank = 2;
