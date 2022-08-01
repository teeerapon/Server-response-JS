SELECT headers.[nac_code]
      ,headers.[nac_type]
      ,name_status.[status_name]
      ,headers.[nac_status]
      ,headers.[source_dep_owner]
      ,headers.[source_bu_owner]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (headers.source_userid) AS source_userid
      ,headers.[source_date]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (headers.source_approve_userid) AS source_approve_userid
      ,headers.[source_approve_date]
      ,headers.[source_remark]
      ,headers.[des_dep_owner]
      ,headers.[des_bu_owner]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (headers.des_userid) AS des_userid
      ,headers.[des_date]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (headers.des_approve_userid) AS des_approve_userid
      ,headers.[des_approve_date]
      ,headers.[des_remark]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (headers.verify_by_userid) AS verify_by_userid
      ,headers.[verify_date]
      ,headers.[sum_price]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (headers.create_by) AS create_by
      ,headers.[create_date]
      ,PTEC_USERSRIGHT.dbo.ufn_user_code (headers.account_aprrove_id) AS account_aprrove_id
      ,headers.[real_price]
  FROM [TEST_OPS].[dbo].[Fix_Assets_Control_NAC_Headers] headers
  inner join [TEST_OPS].[dbo].[FA_Control_status] name_status on headers.[nac_status] = name_status.[nac_status_id]
  where [nac_code]=@nac_code