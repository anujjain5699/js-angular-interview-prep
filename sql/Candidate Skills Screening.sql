--LinkedIn SQL Interview Question | DataLemur 
-- Candidate Skills Screening
-- ===========================
--
-- Problem:
-- Given a table of candidates and their skills, find the candidates best suited
-- for an open Data Science job.
--
-- Required skills:
--   1. Python
--   2. Tableau
--   3. PostgreSQL
--
-- Return the candidate IDs of candidates who possess all three required skills.
-- Sort the results by candidate_id in ascending order.
--
-- Assumption:
-- There are no duplicate rows in the candidates table.

-- Table: candidates
-- -----------------
-- | Column       | Type    |
-- |--------------|---------|
-- | candidate_id | integer |
-- | skill        | varchar |

-- Example input:
-- | candidate_id | skill      |
-- |--------------|------------|
-- | 123          | Python     |
-- | 123          | Tableau    |
-- | 123          | PostgreSQL |
-- | 234          | R          |
-- | 234          | PowerBI    |
-- | 234          | SQL Server |
-- | 345          | Python     |
-- | 345          | Tableau    |

-- Expected output:
-- | candidate_id |
-- |--------------|
-- | 123          |
--
-- Candidate 123 is included because they have all three required skills.
-- Candidate 345 is excluded because they are missing PostgreSQL.

-- Solution:
SELECT
    candidate_id
FROM candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP BY candidate_id
HAVING COUNT(*) = 3
ORDER BY candidate_id ASC;

