SELECT [AssetID]
      ,[Code]
      ,[Name]
      ,[BranchID]
      ,[imagePath]
      ,[imagePath_2]
      ,[Details]
FROM [dbo].[Assets]
WHERE [Code]=@Code