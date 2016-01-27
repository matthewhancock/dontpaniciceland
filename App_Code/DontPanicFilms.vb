Public Class DontPanicFilms

    Public Class Pages
        Private Shared _loaded As Boolean = False
        Public Shared Sub Load()
            If Not _loaded Then

                _loaded = True
            End If
        End Sub
        Private Class FilePath
            Const RelativePath As String = "~/_html/"
            Public Const About As String = RelativePath & "about.html"
            Public Const Contact As String = RelativePath & "contact.html"
            Public Const News As String = RelativePath & "news.html"
            Public Const Store As String = RelativePath & "store.html"
            Public Const TV As String = RelativePath & "tv.html"
            Public Const Video As String = RelativePath & "video.html"
            Public Const Workshops As String = RelativePath & "workshops.html"
        End Class
        Public Class Page
            Private Shared _pages As List(Of Page) = New List(Of Page)

            Public Shared About As Page = New Page("About Don't Panic", "about", FilePath.About)
            Public Shared Contact As Page = New Page("Contact Us", "contact", FilePath.Contact)
            Public Shared News As Page = New Page("News & Updates", "news", FilePath.News)
            Public Shared Store As Page = New Page("Store", "store", FilePath.Store)
            Public Shared TV As Page = New Page("DontPanicTV", "tv", FilePath.TV)
            Public Shared Video As Page = New Page("Film & Music Video", "video", FilePath.Video)
            Public Shared Workshops As Page = New Page("Workshops", "workshops", FilePath.Workshops)

            Private _title, _path, _filePath, _content As String
            Private Sub New(Title As String, Path As String, FilePath As String)
                _title = Title
                _path = Path
                _filePath = FilePath
                Util.LoadToString(_filePath, _content)
                _pages.Add(Me)
            End Sub
            ReadOnly Property Title As String
                Get
                    Return "Don't Panic Films | " & _title
                End Get
            End Property
            ReadOnly Property Path As String
                Get
                    Return _path
                End Get
            End Property
            ReadOnly Property Content As String
                Get
                    Return _content
                End Get
            End Property
            Public Shared Function Find(Path As String) As Page
                Return _pages.Find(Function(p) p.Path = Path)
            End Function
        End Class
    End Class


    Public Enum PageOption
        News
        About
        Video
        TV
        Workshops
        Store
        Contact
        Home
    End Enum

    Public Shared ReadOnly Property BaseURL As String
        Get
            Dim r = HttpContext.Current.Request
            Dim path As String = r.ApplicationPath
            If path = "/" Then
                path = String.Empty
            End If
            Return r.Url.Scheme & Uri.SchemeDelimiter & r.Url.Authority & path
        End Get
    End Property
    Public Shared ReadOnly Property Path As String
        Get
            Dim r = HttpContext.Current.Request
            Dim p As String = r.ApplicationPath
            If p = "/" Then
                Return String.Empty
            Else
                Return p
            End If
        End Get
    End Property
End Class