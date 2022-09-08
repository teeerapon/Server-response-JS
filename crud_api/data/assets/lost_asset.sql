SELECT COUNTED.[AssetID]
      ,COUNTED.[Code]
      ,COUNTED.[Name]
      ,COUNTED.[BranchID]
      ,COUNTED.[Date]
      ,COUNTED.[Status]
      ,COUNTED.[RoundID]
      ,COUNTED.[Reference]
      -- ,[UserID]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (COUNTED.[UserID]) AS UserID
      ,COUNTED.[UserBranch]
      ,MAIN.[imagePath]
      ,MAIN.[imagePath_2]
      ,COUNTED.[detail]
FROM [TEST_OPS].[dbo].[Fix_Assets_Counted] COUNTED
LEFT JOIN [TEST_OPS].[dbo].[Assets] MAIN ON MAIN.[Code] = COUNTED.[Code]
WHERE COUNTED.[UserBranch]=@UserBranch AND COUNTED.[BranchID]=@BranchID AND COUNTED.[RoundID]=@RoundID 
AND COUNTED.[Reference] IN ('ทรัพย์สินหาย', 'ทรัพย์สินไม่มี QR Code ')
ORDER BY COUNTED.[Date] DESC, COUNTED.[RoundID] DESC , COUNTED.[Reference] DESC