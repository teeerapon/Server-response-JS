SELECT [AssetID]
      ,[Code]
      ,[Name]
      ,[BranchID]
      ,[Date]
      ,[Status]
      ,[RoundID]
      ,[Reference]
      -- ,[UserID]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (UserID) AS UserID
      ,[UserBranch]
      ,[imagePath]
      ,[detail]
FROM [TEST_OPS].[dbo].[Fix_Assets_Counted]
WHERE [UserBranch]=@UserBranch AND [BranchID]=@BranchID AND [RoundID]=@RoundID 
AND [Reference] IN ('ทรัพย์สินหาย', 'ทรัพย์สินไม่มี QR Code ')
ORDER BY [Date] DESC, [RoundID] DESC , [Reference] DESC