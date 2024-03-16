GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Organization_Update_IsValidated]
@IsValidated bit,
@Id int 


as

begin

Update dbo.Organizations

set  [IsValidated] = @IsValidated
where Id = @Id

end
GO
