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
WHERE COUNTED.[BranchID]!=@BranchID AND COUNTED.[RoundID]=@RoundID AND COUNTED.[Status]=1 AND COUNTED.[UserBranch]=@UserBranch
AND COUNTED.[Reference] IN ('','ชำรุดรอซ่อม', 'รอตัดชำรุด ','สภาพดี','ไม่ได้ระบุสถานะ')
ORDER BY COUNTED.[Date] DESC, COUNTED.[RoundID] DESC , COUNTED.[Reference] DESC