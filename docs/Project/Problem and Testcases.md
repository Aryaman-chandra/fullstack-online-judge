
# Storage

#### Storing problems and testcases in [[Online Judge]] ? 

Since the individual test cases and problems text however large is not greater 16MB we can safely store the testcases in mongodb as string text.

We don't need to add the complexity of GridFs in our application.

#### File format : 
For now i'm storing them as having custom fields of string , after that i will give the option to store it as markdown instead with custom flag of is Markdown? 
We can store them in  [Markdown files](https://www.markdownguide.org/getting-started/) which gives us the advantages of customization and processing benefits.

##### Advantages of Markdown : 
Markdown has several advantages as oppose to doc, docx and pdf.
1. Lightweight
2. Easy to use 
3. Can be rendered as HTML 
4. Can be converted to pdf
5. Are simple text files
6. Customizability
7. Templating.

##### Markdown Structure for a Problem
>[!important] 
>All problem statement files must adhere to the prescribed structure, template, or follow the established guidelines.


##### Problems Title
- Any H1 tag or '#' will be parsed as a problem title , 
- Each problem must have one 
- If more than one only first one would be considered 

##### Problem statement
- The statement field of the problem supports standard [Markdown Syntax](https://www.markdownguide.org/) 
##### Sample Testcases
- Users can create sample testcase by directly putting inside a blockquote in statement
   any value inside triple backticks will be treated as blockquote.
   and rendered as code block , make sure you add proper heading for the code block
#### Images
- Support for rendering images use the standard [embed image notation of Markdown syntax](https://www.markdownguide.org/basic-syntax/#images-1)  at the suitable position .

#### Latex
Problems can also have latex notation for writing mathematical notation . 
And all the common Markdown features are supported by code-nexus.



