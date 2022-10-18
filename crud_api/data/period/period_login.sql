SELECT [PeriodID]
      ,[BeginDate]
      ,[EndDate]
      ,[BranchID]
      ,[Description]
FROM [dbo].[Fix_Assets_Period]
WHERE [BeginDate] <=GETDATE() AND [EndDate] >=GETDATE() and [BranchID]=@BranchID
ORDER BY PeriodID ASC