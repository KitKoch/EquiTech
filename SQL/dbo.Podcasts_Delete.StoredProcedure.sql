GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Podcasts_Delete]
@Id int
as
/*
Declare @Id int = 4
select * from dbo.Podcasts
where Id = @Id
execute dbo.Podcasts_Delete @Id
select * from dbo.Podcasts
where Id = @Id
*/

begin 

DELETE FROM [dbo].[Podcasts]
      WHERE Id = @Id
end
GO
