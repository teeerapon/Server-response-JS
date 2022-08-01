SELECT *
  FROM [TEST_OPS].[dbo].[Fix_Assets_Counted]
  WHERE [Code]=@Code AND [UserBranch]=@UserBranch AND [RoundID]=@RoundID AND [Status]=1