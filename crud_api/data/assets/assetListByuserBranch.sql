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
WHERE [BranchID]=@BranchID AND [RoundID]=@RoundID  AND [Status]=1 AND [UserBranch]=@UserBranch
AND [Reference] IN ('','ชำรุดรอซ่อม', 'รอตัดชำรุด ','สภาพดี','ไม่ได้ระบุสถานะ', 'QR Code ไม่สมบูรณ์ (สภาพดี)','QR Code ไม่สมบูรณ์ (ชำรุดรอซ่อม)','QR Code ไม่สมบูรณ์ (รอตัดชำรุด)')
ORDER BY [Date] DESC, [RoundID] DESC, [Reference] DESC