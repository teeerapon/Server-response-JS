begin tran

INSERT INTO [dbo].[Users]
    (   
        [UserID]
      , [UserCode]
      , [Name]
      , [BranchID]
      , [DepID]
      , [SecID]
      , [Password]
      , [PositionID]
      , [Email]
      , [Tel]
      , [Actived]
    )
VALUES (
    @UserID,
    @UserCode,
    @Name,
    @BranchID,
    @DepID,
    @SecID,
    @Password,
    @PositionID,
    @Email,
    @Tel,
    @Actived 
)

if @@error>0 and @@trancount>0
begin
	rollback tran
end
else
begin
	commit tran
end