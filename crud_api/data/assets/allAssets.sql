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
FROM [TEST_OPS].[dbo].[Fix_Assets_Counted] COUNTED
LEFT JOIN [TEST_OPS].[dbo].[Assets] MAIN ON MAIN.[Code] = COUNTED.[Code]
WHERE COUNTED.[RoundID]=@RoundID AND COUNTED.[BranchID]=@BranchID  AND COUNTED.[Status]=0
ORDER BY COUNTED.[AssetID] ASC