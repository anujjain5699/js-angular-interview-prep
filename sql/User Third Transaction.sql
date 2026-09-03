-- Third Transaction Per User
--
-- Assume you are given a transactions table containing Uber transactions
-- made by users. Write a query to retrieve the third transaction for every
-- user.
--
-- Return:
--   user_id
--   spend
--   transaction_date

-- Table definition:
--
-- CREATE TABLE transactions (
--     user_id INTEGER,
--     spend DECIMAL,
--     transaction_date TIMESTAMP
-- );

-- Example input:
--
-- user_id | spend  | transaction_date
-- --------+--------+--------------------------
-- 1       | 100.50 | 2022-01-08 12:00:00
-- 1       | 155.00 | 2022-01-10 12:00:00
-- 1       | 89.60  | 2022-02-05 12:00:00
-- 2       | 136.00 | 2022-01-18 12:00:00
-- 2       | 524.99 | 2022-01-26 12:00:00

WITH ranked_transactions AS (
	SELECT
		user_id,
		spend,
		transaction_date,
		ROW_NUMBER() OVER (
			PARTITION BY user_id
			ORDER BY transaction_date ASC
		) AS transaction_rank
	FROM transactions
)
SELECT
	user_id,
	spend,
	transaction_date
FROM ranked_transactions
WHERE transaction_rank = 3;

-- Expected output:
--
-- user_id | spend | transaction_date
-- --------+-------+--------------------------
-- 1       | 89.60 | 2022-02-05 12:00:00
