begin tran

UPDATE [TEST_OPS].[dbo].[Users]
SET    [UserCode]=@UserCode
      ,[Name]=@Name
      ,[BranchID]=@BranchID
      ,[DepID]=@DepID
      ,[SecID]=@SecID
      ,[Password]=@Password
      ,[PositionID]=@PositionID
      ,[Email]=@Email
      ,[Tel]=@Tel
      ,[Actived]=@Actived
WHERE [UserID] =@UserID

SELECT [UserID]
      ,[UserCode]
      ,[Name]
      ,[BranchID]
      ,[DepID]
      ,[SecID]
      ,[Password]
      ,[PositionID]
      ,[Email]
      ,[Tel]
      ,[Actived]
  FROM [TEST_OPS].[dbo].[Users]
  WHERE [UserID] =@UserID

if @@error>0 and @@trancount>0
begin
	rollback tran
end
else
begin
	commit tran
end