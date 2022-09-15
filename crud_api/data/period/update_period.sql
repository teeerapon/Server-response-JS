begin tran
----------------------------------------

      UPDATE [dbo].[Fix_Assets_Period]
      SET    [BeginDate]=@BeginDate
            ,[EndDate]=@EndDate
            ,[BranchID]=@BranchID
            ,[Description]=@Description
            ,[update_by]=@usercode
            ,[update_date]=getdate()
      WHERE  [PeriodID]=@PeriodID

------------------------------------------
if @@error>0 and @@trancount>0
begin
	rollback tran
end
else
begin
	commit tran
end