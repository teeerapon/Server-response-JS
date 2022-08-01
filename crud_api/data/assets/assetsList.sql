SELECT [AssetID]
      ,[Code]
      ,[Name]
      ,[BranchID]
      ,[Date]
      ,[Status]
      ,[UserID]
      ,[UserBranch]
      ,[imagePath]
      ,[detail]
  FROM [TEST_OPS].[dbo].[Fix_Assets_Counted]
  WHERE RoundID=@RoundID
  ORDER BY [AssetID]  ASC, [Reference] ASC