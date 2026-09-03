--Facebook SQL Interview Question | DataLemur 
-- Facebook Pages with Zero Likes
-- =============================
--
-- Problem:
-- Given two tables containing Facebook Pages and their likes, return the IDs
-- of pages that have received zero likes.
--
-- Sort the output by page_id in ascending order.

-- Table: pages
-- ------------
-- | Column    | Type    |
-- |-----------|---------|
-- | page_id   | integer |
-- | page_name | varchar |

-- Example input: pages
-- | page_id | page_name             |
-- |---------|-----------------------|
-- | 20001   | SQL Solutions         |
-- | 20045   | Brain Exercises       |
-- | 20701   | Tips for Data Analysts |

-- Table: page_likes
-- -----------------
-- | Column     | Type     |
-- |------------|----------|
-- | user_id    | integer  |
-- | page_id    | integer  |
-- | liked_date | datetime |

-- Example input: page_likes
-- | user_id | page_id | liked_date           |
-- |---------|---------|----------------------|
-- | 111     | 20001   | 04/08/2022 00:00:00  |
-- | 121     | 20045   | 03/12/2022 00:00:00  |
-- | 156     | 20001   | 07/25/2022 00:00:00  |

-- Expected output:
-- | page_id |
-- |---------|
-- | 20701   |

-- Solution:
SELECT
    page_id
FROM pages
WHERE page_id NOT IN (
    SELECT DISTINCT
        page_id
    FROM page_likes
)
ORDER BY page_id ASC;
