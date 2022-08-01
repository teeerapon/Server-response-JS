SELECT [AssetID]
FROM [TEST_OPS].[dbo].[Fix_Assets_Counted]
WHERE RoundID=@PeriodID AND [Status]=1