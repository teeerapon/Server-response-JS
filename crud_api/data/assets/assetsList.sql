SELECT COUNTED.[AssetID]
      ,COUNTED.[Code]
      ,COUNTED.[Name]
      ,COUNTED.[BranchID]
      ,COUNTED.[Date]
      ,COUNTED.[Status]
      ,COUNTED.[UserID]
      ,COUNTED.[UserBranch]
      ,MAIN.[imagePath]
      ,MAIN.[imagePath_2]
      ,COUNTED.[detail]
FROM [TEST_OPS].[dbo].[Fix_Assets_Counted] COUNTED
LEFT JOIN [TEST_OPS].[dbo].[Assets] MAIN ON MAIN.[Code] = COUNTED.[Code]
WHERE COUNTED.[RoundID]=@RoundID
ORDER BY COUNTED.[AssetID]  ASC, COUNTED.[Reference] ASC