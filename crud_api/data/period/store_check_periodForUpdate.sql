IF NOT exists(SELECT [PeriodID] FROM [dbo].[Fix_Assets_Period] WHERE [PeriodID]=@PeriodID AND [BeginDate] <=@BeginDate AND [EndDate] >=@EndDate)
    BEGIN
        SELECT [PeriodID]
              ,[BeginDate]
              ,[EndDate]
              ,[BranchID]
              ,[Description]
        FROM [dbo].[Fix_Assets_Period]
        WHERE [BeginDate] <=@BeginDate AND [EndDate] >=@EndDate
        ORDER BY PeriodID ASC
    END