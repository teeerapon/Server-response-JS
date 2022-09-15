SELECT MAIN.[Code]
      ,MAIN.[AssetID]
      ,MAIN.[Name]
      ,MAIN.[Details]
      ,MAIN.[SerialNo]
      ,MAIN.[Price]
      ,MAIN.[ImagePath]
      ,MAIN.[ImagePath_2]
      ,MAIN.[CreateDate]
  FROM [dbo].[Assets] MAIN
LEFT JOIN [dbo].[Fix_Assets_Counted] COUNTED ON MAIN.[Code] = COUNTED.[Code]
  WHERE MAIN.[Code]=@Code