SELECT *
  FROM [dbo].[Fix_Assets_Control_NAC_Detail]
  where [nac_code]=@nac_code AND [nacdtl_active]=1
  Order by [nacdtl_id] ASC