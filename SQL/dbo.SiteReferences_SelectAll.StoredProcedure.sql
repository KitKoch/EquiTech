GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SiteReferences_SelectAll]
@PageIndex int,
@PageSize int
as
/*
declare @PageIndex int = 0,
@PageSize int = 5
execute dbo.SiteReferences_SelectAll
													@PageIndex 
													,@PageSize 
*/

begin

DECLARE	@offset int = @PageIndex * @PageSize
SELECT [ReferenceTypeId]
      ,[UserId]
	  --,rt.[Name] as Reference
	  ,TotalCount = count(*) over()
  FROM [dbo].[SiteReferences] as sr inner join dbo.ReferenceTypes as rt
  on sr.ReferenceTypeId = rt.Id
  order by sr.ReferenceTypeId
    offset @offset rows
  fetch next @PageSize rows only 



end
GO
