SELECT [AssetID]
      ,[Code]
      ,[Name]
      ,[BranchID]
      ,[imagePath]
      ,[Details]
FROM [TEST_OPS].[dbo].[Assets]
WHERE [Code]=@Code