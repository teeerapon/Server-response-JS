if @BranchID !=901
    begin
        SELECT [Code] FROM [TEST_OPS].[dbo].[Assets]
            WHERE [BranchID]=@BranchID AND [active] = 1
    end
else if @BranchID = 901
    begin
        SELECT [Code] FROM [TEST_OPS].[dbo].[Assets] WHERE [active] = 1 ORDER BY [BranchID] DESC
    end