IF @BranchID = 901
    BEGIN
        SELECT  [PeriodID]
                ,[BeginDate]
                ,[EndDate]
                ,[BranchID]
                ,[Description]
                ,PTEC_USERSRIGHT.dbo.ufn_user_code (create_by) AS create_by
        FROM [dbo].[Fix_Assets_Period]
        ORDER BY [BeginDate] DESC, [PeriodID] DESC
    END