SELECT [nac_code]
      ,[description]
      ,[linkpath]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (create_by) AS userid
      ,[create_by]
      ,[create_date]
  FROM [dbo].[Fix_Assets_Control_NAC_PATH]
WHERE [nac_code]=@nac_code and [path_active] = 1
Order by [linkpath_id] asc, [create_date] asc