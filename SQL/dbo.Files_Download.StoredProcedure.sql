GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Files_Download]
	@Id int

as

-- testing --
/*

	declare @id int = 2
	execute dbo.Files_Download @id
	select * from dbo.FilesV2 where Id = @id

*/

begin

	update dbo.FilesV2
	set Downloaded = Downloaded + 1
	where Id = @Id
	
end
GO
