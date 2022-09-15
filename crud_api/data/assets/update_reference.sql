begin tran

UPDATE [dbo].[Fix_Assets_Counted]
SET    [Reference]=@Reference
      ,[UserID]=@UserID
WHERE [Code] =@Code AND [RoundID]=@RoundID

----------------------------------------------------

UPDATE [dbo].[Assets]
SET    [Details]=@Reference
      ,[UpdateBy]=@UserID
	  ,[UpdateDate]=getdate()
WHERE [Code] =@Code

if @@error>0 and @@trancount>0
begin
	rollback tran
end
else
begin
	commit tran
end