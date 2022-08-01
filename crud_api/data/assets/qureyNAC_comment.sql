SELECT PTEC_USERSRIGHT.dbo.ufn_user_code (userid) AS userid
      ,[comment]
      ,[create_date]
  FROM [TEST_OPS].[dbo].[Fix_Assets_Control_NAC_Comments]
  WHERE [nac_code]=@nac_code and [comment_active]=1
  Order by [comment_id] asc, [create_date] asc