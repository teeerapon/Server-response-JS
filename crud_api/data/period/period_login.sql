SELECT [PeriodID]
      ,[BeginDate]
      ,[EndDate]
      ,[BranchID]
      ,[Description]
FROM [dbo].[Fix_Assets_Period]
WHERE [BeginDate] <=@BeginDate AND [EndDate] >=@EndDate and [BranchID]=@BranchID
ORDER BY PeriodID ASC