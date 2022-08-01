-- SELECT [AssetID]
--       ,[Code]
--       ,[Name]
--       ,[BranchID]
--       ,ISNULL([Price], 0) [Price]
-- ,CASE
-- WHEN (SELECT count(*) FROM Test_Fix_Assets b  WHERE b.Code=a.code)>0 THEN 1
-- ELSE 0
--   END AS Active
--   FROM [TEST_OPS].[dbo].[Assets] a
--   WHERE BranchID=@BranchID and (select count(*) from Test_Fix_Assets b  where b.Code=a.code) < 1 
--   ORDER BY Active,[AssetID] ASC
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
FROM [TEST_OPS].[dbo].[Fix_Assets_Counted]
WHERE RoundID=@RoundID AND BranchID=@BranchID  AND [Status]=0
ORDER BY [AssetID] ASC