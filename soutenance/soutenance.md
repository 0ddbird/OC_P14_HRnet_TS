# P14 - HRNet

## <a id="index">Index</a>

[1 - Objectifs](#1)
[2 - Composants](#2)
[2.1 - Select](#2.1)
[2.2 - Modale](#2.2)
[2.3 - Tableau](#2.3)
[2.4 - Datepicker](#2.4)

## <a id="1">1 - Objectifs</a>

HRnet est une application destinée aux services Ressources Humaines pour leur permettre de consulter la liste des employés de l'entreprise et d'en ajouter de nouveaux.

L'application a été développée en jQuery et doit être redéveloppée en React.
Elle est composée de 4 modules : 

- Une **modale**
- Un **datepicker**
- Un **tableau**
- Un **select**

Les contraintes du projets sont les suivantes : 

- Coder l'un des modules ci-dessous sous forme de composant React stateless
- Exporter ce composant sous forme de package NPM
- Remplacer les 3 autres composans par des librairies NPM existantes
- Reconstruire l'application en React en utilisant ces 4 composants
- Comparer les performances entre la version jQuery et la version React avec Lighthouse

[:arrow_up_small: Retourner à l'index](#index)

## <a id="2">2 - Composants</a>


| Composant | Langage | Package NPM | Repo GitHub | Dépend de |
|--|--|--|--|--|
|Select| TypeScript |[react-ts-controlled-select](https://www.npmjs.com/package/react-ts-controlled-select)|[:file_folder:](https://github.com/0ddbird/react-ts-controlled-select)| - |
|Modal| TypeScript |[react-ts-simple-modal](https://www.npmjs.com/package/react-ts-simple-modal)|[:file_folder:](https://github.com/0ddbird/react-ts-modal)| - |
|Table| TypeScript |[react-ts-table](https://www.npmjs.com/package/react-ts-table)| [:file_folder:](https://github.com/0ddbird/react-ts-table)| Select |
|Datepicker| TypeScript |[react-ts-datepicker](https://www.npmjs.com/package/react-ts-datepicker)| [:file_folder:](https://github.com/0ddbird/react-ts-datepicker)| Select |

[:arrow_up_small: Retourner à l'index](#index)

### <a id="2.1">2.1 - Select</a>
Le select s'appuie sur un `<select>` HTML.
Il est controllé par React et nécessite 3 props pour fonctionner.

```ts
export interface IOption {
  label: string
  value: string
}

interface ISelectProps {
  options: IOption[]
  selected: IOption
  setSelected: React.Dispatch<React.SetStateAction<IOption>>
  id?: string
}

const Select = ({ options, selected, setSelected, id }: ISelectProps): JSX.Element => {
  function handleSelection (e: React.ChangeEvent<HTMLSelectElement>): void {
    const selectedOption = options.find(option => option.value === e.target.value)
    if (selectedOption != null) setSelected(selectedOption)
  }
  return (
    <select id={id} className='controlled-select' value={selected.value} onChange={handleSelection}>
      {
      options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
      }
    </select>
  )
}

```

[:arrow_up_small: Retourner à l'index](#index)

### <a id="2.2">2.2 - Modale</a>

```ts
interface IModalProps {
  title: string
  content: string
  modalDisplayed: boolean
  setModalDisplayed: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ title, content, modalDisplayed, setModalDisplayed }: IModalProps): JSX.Element => {
  return (
    <div className={modalDisplayed ? 'modal displayed' : 'modal hidden'}>
      <h1 className='modal-title'>{title}</h1>
      <span className='modal-content'>{content}</span>
      <button className='modal-close' onClick={() => setModalDisplayed(false)}>x</button>
    </div>
  )
}

export default Modal
```

[:arrow_up_small: Retourner à l'index](#index)

### <a id="2.3">2.3 - Tableau</a>

Le composant Tableau requiert 3 props :

```ts
export interface ITableProps {
  items: ITableItem[]
  accessors: ITableAccessor[]
  options: ITableOptions
}
```

**items** : une liste d'éléments à afficher

```ts
[
  {
  firstName: 'Jane',
  lastName: 'Doe',
  startDate: '2022-10-11',
  departmentName: 'Sales',
  birthDate: '1990-05-04',
  street: '123, oak street',
  city: 'New York',
  state: 'NY',
  zipCode: '123456'
  },
  {
  firstName: 'John',
  lastName: 'Doe',
  startDate: '2022-10-11',
  departmentName: 'Sales',
  birthDate: '1990-05-04',
  street: '123, oak street',
  city: 'New York',
  state: 'NY',
  zipCode: '123456'
  }
]
```

**accessors** : les colonnes à afficher
```ts
[
  {
    name: 'First Name',
    value: 'firstName'
  },
  {
    name: 'Last Name',
    value: 'lastName'
  },
  {
    name: 'Start Date',
    value: 'startDate'
  },
  {
    name: 'Department',
    value: 'departmentName'
  },
  {
    name: 'Birth Date',
    value: 'birthDate'
  },
  {
    name: 'Street',
    value: 'street'
  },
  {
    name: 'City',
    value: 'city'
  },
  {
    name: 'State',
    value: 'state'
  },
  {
    name: 'Zip Code',
    value: 'zipCode'
  }
]
```

**options** : les modules optionnels du tableau à activer

```ts
export interface ITableOptions {
  searchModule: boolean
  paginationModule: boolean
  countModule: boolean
  navigationModule: boolean
  paginationOptions?: PaginationOptions
  cssPrefix?: string
}
```

#### Fonctionnement du tableau

Le tableau reçoit une liste d'éléments à afficher.
Il reçoit également une liste d'accesseurs, qui permettent de définir quelles colonnes afficher.

Le tableau dispose de 4 modules facultatifs :

- **Un module de pagination :** il s'agit d'un select qui permet de choisir combien de lignes afficher. Ce module repose sur le composant Select créé préalablement, et requiert donc une liste d'options à afficher.
- **Un module de compte de lignes :** il affiche quelle plage d'éléments est affichée, et le nombre total d'éléments du tableau
- **Un module de recherche :** il permet de rechercher un mot clé parmi tous les éléments du tableau, et d'afficher uniquement les entrées correspondantes
- **Un module de navigation :** si toutes les entrées du tableau ne sont pas affichées, il permet de naviguer entre les pages afin d'afficher les X entrées suivantes/précédentes (X étant la taille de la plage)

Dans le cas où le module de pagination est activé, il faut également renseigner les options à la clé 
`paginationOptions`

Enfin, l'option facultative `cssPrefix` permet d'ajouter une chaîne de caractère qui servira à préfixer les `className` des éléments du tableau, pour simplifier la modification du style CSS.

[:arrow_up_small: Retourner à l'index](#index)

### <a id="2.4">2.4 - Datepicker</a>

```ts
export interface IDatepickerProps {
  startYear: number
  stopYear: number
  defaultYear: IMonthOption
  defaultMonth: IYearOption
  selectedDate: IDateOption
  setSelectedDate: React.Dispatch<React.SetStateAction<IDateOption>>
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}
```

**startYear** : la première année affichée
**stopYear** : la dernière année affichée
**defaultYear** : l'année proposée par défaut
**defaultMonth** : le mois proposé par défaut
**selectedDate** : la date sélectionnée
**setSelectedDate** : la fonction dispatch du useState pour sélectionner la date
**isExpanded** : la valeur qui détermine si le datepicker est affiché ou non
**setIsExpanded** : la fonction dispatch pour afficher/masquer le datepicker

#### Fonctionnement du datepicker

On choisit la plage d'années à afficher avec **[startYear, stopYear]**
On choisit la vue par défaut : par exemple Novembre 2022
Quand on ouvre le datepicker, il va composer un object contenant les dates à afficher.
Cet objet a le format suivant :

```ts
{
    previousMonth: previousMonthDays,
    currentMonth: currentMonthDays,
    nextMonth: nextMonthDays
}
```

chaque valeur est un tableau contenant des Dates.
Le tableau à la clé `currentMonth` contiendra toutes les dates du mois de Novembre 2022.

Comme la première date affichée doit être un Dimanche, et la dernière date un Samedi, le datepicker complètera avec des jours du mois précédent / suivant pour s'en assurer.

Par exemple :

- Le premier jour de Novembre 2022 est un Mardi
- Le dernier jour de Novembre 2022 est un Mercredi

Dans ce cas, le datepicker ajoutera :

- Dimanche 30/10 et Lundi 31/10 à la clé `previousMonthDays`
- Jeudi 01/12, Vendredi 02/12, Samedi 03/12 à la clé `nextMonthDays`

De cette manière, le nombre de jours affichés sera variable, mais commencera toujours un Dimanche et se terminera toujours un Samedi.

[:arrow_up_small: Retourner à l'index](#index)