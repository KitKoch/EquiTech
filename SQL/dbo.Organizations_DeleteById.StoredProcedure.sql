GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Organizations_DeleteById]
@Id int

/*--test--
execute dbo.Organizations_DeleteById  6
*/
as

begin

delete from dbo.Organizations
where Id = @Id

end
GO
