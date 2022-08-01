begin tran

UPDATE [TEST_OPS].[dbo].[Fix_Assets_Counted]
SET    [Reference]=@Reference
      ,[UserID]=@UserID
WHERE [Code] =@Code AND [RoundID]=@RoundID

if @@error>0 and @@trancount>0
begin
	rollback tran
end
else
begin
	commit tran
end