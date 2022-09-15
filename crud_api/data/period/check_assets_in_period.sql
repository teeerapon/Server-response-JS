SELECT [AssetID]
FROM [dbo].[Fix_Assets_Counted]
WHERE RoundID=@PeriodID AND [Status]=1