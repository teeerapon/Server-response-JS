IF @BranchID <> 901
    BEGIN
        SELECT  [PeriodID]
                ,[BeginDate]
                ,[EndDate]
                ,[BranchID]
                ,[Description]
        FROM [TEST_OPS].[dbo].[Fix_Assets_Period]
        WHERE ([BranchID]=0 OR [BranchID]=@BranchID)
        ORDER BY PeriodID DESC
    END
ELSE
    BEGIN
        SELECT  [PeriodID]
                ,[BeginDate]
                ,[EndDate]
                ,[BranchID]
                ,[Description]
        FROM [TEST_OPS].[dbo].[Fix_Assets_Period]
        ORDER BY PeriodID DESC
    END