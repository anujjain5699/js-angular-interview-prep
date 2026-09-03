-- ============================================================
-- 3-Day Rolling Average of Tweets
-- Source: DataLemur / SQL Interview Question
-- ============================================================

-- QUESTION:
-- Given a table of tweet data over a specified time period, calculate the
-- 3-day rolling average of tweets for each user.
-- Output the user ID, tweet date, and rolling averages rounded to 2 decimal places.
--
-- A rolling average (also called moving average or running mean) is a
-- time-series technique that examines trends in data over a specified period.
-- Here we want to see how the tweet count for each user changes over a 3-day period.

-- ============================================================
-- TABLE STRUCTURE
-- ============================================================
-- Table: tweets
--
-- column_name | type      | description
-- ------------+-----------+-----------------------------
-- user_id     | integer   | ID of the user
-- tweet_date  | timestamp | Date and time of the tweets
-- tweet_count | integer   | Number of tweets on that date

-- ============================================================
-- SAMPLE INPUT
-- ============================================================
-- user_id | tweet_date           | tweet_count
-- --------+----------------------+------------
-- 111     | 2022-06-01 00:00:00  | 2
-- 111     | 2022-06-02 00:00:00  | 1
-- 111     | 2022-06-03 00:00:00  | 3
-- 111     | 2022-06-04 00:00:00  | 4
-- 111     | 2022-06-05 00:00:00  | 5
-- 199     | 2022-06-01 00:00:00  | 7
-- 199     | 2022-06-02 00:00:00  | 5
-- 199     | 2022-06-03 00:00:00  | 9

-- ============================================================
-- EXPECTED OUTPUT
-- ============================================================
-- user_id | tweet_date           | rolling_avg_3d
-- --------+----------------------+----------------
-- 111     | 2022-06-01 00:00:00  | 2.00
-- 111     | 2022-06-02 00:00:00  | 1.50
-- 111     | 2022-06-03 00:00:00  | 2.00
-- 111     | 2022-06-04 00:00:00  | 2.67
-- 111     | 2022-06-05 00:00:00  | 4.00
-- 199     | 2022-06-01 00:00:00  | 7.00
-- 199     | 2022-06-02 00:00:00  | 6.00
-- 199     | 2022-06-03 00:00:00  | 7.00

-- How the expected values are calculated:
--
-- User 111:
--   06/01: 2 / 1             = 2.00  (only 1 row available)
--   06/02: (2 + 1) / 2       = 1.50  (only 2 rows available)
--   06/03: (2 + 1 + 3) / 3   = 2.00  (full 3-day window)
--   06/04: (1 + 3 + 4) / 3   = 2.67  (window slides forward)
--   06/05: (3 + 4 + 5) / 3   = 4.00
--
-- User 199 (window resets for new user):
--   06/01: 7 / 1             = 7.00  (only 1 row — window resets!)
--   06/02: (7 + 5) / 2       = 6.00  (only 2 rows for this user)
--   06/03: (7 + 5 + 9) / 3   = 7.00  (full 3-day window)

-- ============================================================
-- SOLUTION
-- ============================================================

SELECT
  user_id,
  tweet_date,
  ROUND(
    AVG(tweet_count * 1.0) OVER (
      PARTITION BY user_id
      ORDER BY tweet_date
      ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2
  ) AS rolling_avg_3d
FROM tweets;

-- ============================================================
-- EXPLANATION
-- ============================================================

-- 1. AVG() Window Function
--    ---------------------------------------------------------
--    AVG(tweet_count) computes the average over the window frame.
--    Unlike SUM()/count manually, AVG() automatically divides by
--    the actual number of rows in the window:
--      - Row 1: only 1 row exists → divides by 1
--      - Row 2: only 2 rows exist → divides by 2
--      - Row 3+: full 3 rows      → divides by 3
--    This eliminates the need for manual ROW_NUMBER() + CASE logic.

-- 2. tweet_count * 1.0
--    ---------------------------------------------------------
--    Converts integer to decimal BEFORE averaging. Without this,
--    some databases (SQL Server, PostgreSQL) perform integer division:
--      (2 + 1) / 2 = 1  (truncated, not 1.5)
--    With * 1.0:
--      (2.0 + 1.0) / 2 = 1.5  (correct)

-- 3. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
--    ---------------------------------------------------------
--    Defines the sliding window: current row + up to 2 rows before it.
--    This gives us the "3-day" rolling window.

-- 4. ORDER BY tweet_date
--    ---------------------------------------------------------
--    Defines the chronological sequence of rows within each partition.
--    Without it, the row order is UNDEFINED — the database can return
--    rows in any order, making the "preceding" rows random.

-- 5. ★ WHY PARTITION BY user_id IS CRITICAL ★
--    ---------------------------------------------------------
--    PARTITION BY resets the window for each user independently.
--    Without it, the window function treats ALL rows across ALL users
--    as one continuous sequence. This causes TWO major bugs:
--
--    BUG A — Cross-user data leakage in SUM/AVG:
--
--      Without PARTITION BY, the "2 PRECEDING" window at user 199's
--      first row looks BACKWARD into user 111's last rows:
--
--        Row 5:  user 111, tweet_count = 5  ← PRECEDING 2 (WRONG USER!)
--        Row 6:  user 111, tweet_count = 4  ← PRECEDING 1 (WRONG USER!)
--        Row 7:  user 199, tweet_count = 7  ← CURRENT ROW
--        → AVG = (5 + 4 + 7) / 3 = 5.33  ❌
--
--      With PARTITION BY user_id, user 199's window starts fresh:
--
--        Row 1:  user 199, tweet_count = 7  ← CURRENT ROW (no preceding)
--        → AVG = 7 / 1 = 7.00  ✅
--
--    BUG B — Wrong divisor if using manual ROW_NUMBER approach:
--
--      ROW_NUMBER() OVER() without PARTITION BY gives a GLOBAL rank.
--      User 199's first row gets rnk=6 (not 1), so any CASE logic
--      based on rnk to determine the divisor breaks:
--
--        User 111: rnk = 1,2,3,4,5  → qty = 1,2,3,3,3  ✅
--        User 199: rnk = 6,7,8      → qty = 3,3,3       ❌ (should be 1,2,3)
--
--    RULE OF THUMB:
--    Every window function on grouped/per-entity data MUST have:
--      • PARTITION BY  → isolates each group (user, category, etc.)
--      • ORDER BY      → defines the row sequence within each group
