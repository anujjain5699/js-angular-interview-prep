 "Bloomberg SQL Interview Question"
 "https://datalemur.com/questions/sql-bloomberg-stock-min-max-1"
 "For each stock ticker in the database, identify the month and year in which it recorded its highest opening price and the month and year it recorded its lowest opening price. Display the ticker, the month/year of the minimum price, the minimum price itself, the month/year of the maximum price, and the maximum price itself."

 CREATE TABLE stock_prices (
    date    TIMESTAMP      NOT NULL,
    ticker  VARCHAR(10)    NOT NULL,
    open    DECIMAL(10, 2),
    high    DECIMAL(10, 2),
    low     DECIMAL(10, 2),
    close   DECIMAL(10, 2)
);

INSERT INTO stock_prices (date, ticker, open, high, low, close) VALUES
('2023-01-31 00:00:00', 'AAPL', 142.28, 142.70, 144.34, 144.29),
('2023-01-30 00:00:00', 'AAPL', 143.28, 145.70, 147.34, 148.29),
('2023-02-28 00:00:00', 'AAPL', 146.83, 147.05, 149.08, 147.41),
('2023-03-31 00:00:00', 'AAPL', 161.91, 162.44, 165.00, 164.90),
('2023-04-30 00:00:00', 'AAPL', 167.88, 168.49, 169.85, 169.68),
('2023-05-31 00:00:00', 'AAPL', 176.76, 177.33, 179.35, 177.25);


date    ticker  open    high    low close
2023-01-31 00:00:00 AAPL    142.28  142.70  144.34  144.29
2023-01-30 00:00:00 AAPL    143.28  145.70  147.34  148.29
2023-02-28 00:00:00 AAPL    146.83  147.05  149.08  147.41
2023-03-31 00:00:00 AAPL    161.91  162.44  165.00  164.90
2023-04-30 00:00:00 AAPL    167.88  168.49  169.85  169.68
2023-05-31 00:00:00 AAPL    176.76  177.33  179.35  177.25


Expected Output Table
AAPL    Jan-2023    142.28  1   AAPL    May-2023    176.76  1

Solution:

with highest_month_price as(
SELECT ticker, TO_CHAR(date, 'Mon-YYYY') AS highest_mth, max(open) as highest_price,
row_number() over(partition by ticker order by open desc) as rnk
 FROM stock_prices
group by ticker,TO_CHAR(date, 'Mon-YYYY'),open order by rnk  desc
),
lowest_month_price as(
SELECT ticker, TO_CHAR(date, 'Mon-YYYY') AS lowest_mth, min(open) as lowest_price,
row_number() over(partition by ticker order by open) as rnk FROM stock_prices
group by ticker,TO_CHAR(date, 'Mon-YYYY'),open order by rnk  desc
)

select * from lowest_month_price l inner join highest_month_price h on l.ticker=h.ticker
where l.rnk=1 and h.rnk=1


Explanation:
Date Formatting:
The query uses TO_CHAR(date, 'Mon-YYYY') to group the data into a readable month-year format (e.g., "Jan-2023"), which allows for reporting on a monthly basis rather than a daily basis.
Ranking with ROW_NUMBER():
In highest_month_price: The query partitions the data by ticker and orders it by the open price in descending order (DESC). This assigns rnk = 1 to the record with the absolute highest opening price for that ticker.
In lowest_month_price: The query partitions the data by ticker and orders it by the open price in ascending order. This assigns rnk = 1 to the record with the absolute lowest opening price for that ticker.
Grouping:
The GROUP BY clause includes ticker, the formatted date, and the open price. This ensures the query evaluates each unique opening price event within its specific month.
The Inner Join:
The final step joins the two CTEs on the ticker column. By filtering for where l.rnk=1 and h.rnk=1, the query filters out all intermediate noise and only pairs the single lowest record with the single highest record for each stock.
Output Generation:
The resulting row provides a side-by-side comparison of the stock's "worst" and "best" performing months (based on opening price) within the dataset provided

