/* eslint-disable spaced-comment */
// *https://www.registers.service.gov.uk/registers/country/use-the-api*

import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import createStyles from '@mui/material/styles/createStyles'
import withStyles from '@mui/material/styles/withStyles'
import { Service } from '@feathersjs/feathers'
import { IQueryResponse } from '../global'
import { showErrorMessage } from '../notification'
import { t } from '../i18n'

const styles = createStyles({})

interface propTypess {
  id?: string
  property: string
  limit?: number
  sortProperty: string
  service: Service<any>
  defaultValue?: any
  default?: boolean
  label: string
  disabled?: boolean
  error?: boolean
  filterParams?: any
  _aggregate?: any
  width?: string
  selectedObject: (obj: any, id: string) => void
}
class Component extends React.Component<propTypess, {}> {
  constructor(props) {
    super(props)
    if (this.props.defaultValue) {
      this.state.inputValue = this.props.defaultValue
      this.state.value = null
      this.state.loading = true
    } else {
      this.state.inputValue = ''
      this.state.value = null
      this.state.loading = true
    }
  }

  static defaultProps = {
    limit: 10,
    default: true,
    label: t('Seçim yapınız'),
  }

  componentDidMount() {
    if (this.props._aggregate) {
      const fetchData = async () => {
        const result = await this.props.service
          .find({
            query: {
              _aggregate:
                this.props._aggregate
            },
          })
        this.setState({ options: result, })
        if (this.props.default)
          this.setState({ value: result[0] })
        this.setState({ loading: false })
      }
      fetchData()

    }
    else if (this.props.limit === -1) {
      this.props.service
        .find({
          query: {
            [this.props.property]: {
              $regex: '(?i)' + this.props.defaultValue + '(?-i)',
            },
            $limit: this.props.limit,
            $sort: {
              [this.props.sortProperty
                ? this.props.sortProperty
                : this.props.property]: 1,
            },
            hidden: false,
            ...this.props.filterParams,
          },
        })
        .then((res: IQueryResponse) => {
          this.setState({
            options: res,
            loading: false,
          })
          if (this.props.default)
            this.setState({ value: res[0] })
        }).catch((e) => {
          showErrorMessage({
            message: 'Bir Hata Meydana Geldi',
            description: e.message,
          })
        }
        )
    } else if (this.props.defaultValue) {
      this.props.service
        .find({
          query: {
            [this.props.property]: this.props.defaultValue,
            $limit: this.props.limit,
            $sort: {
              [this.props.sortProperty
                ? this.props.sortProperty
                : this.props.property]: 1,
            },
            hidden: false,
            ...this.props.filterParams,
          },
        })
        .then((res: IQueryResponse) => {
          if (res.total === 1) {
            this.setState({
              options: res.data,
              value: res.data[0],
              loading: false,
            })
          } else {
            this.setState({ options: res.data, loading: false })
          }
        })
    } else {
      this.props.service
        .find({
          query: {
            [this.props.property]: {
              $regex: '(?i)' + this.state.inputValue + '(?-i)',
            },
            $limit: this.props.limit,
            $sort: {
              [this.props.sortProperty
                ? this.props.sortProperty
                : this.props.property]: 1,
            },
            ...this.props.filterParams,
            hidden: false,
          },
        })
        .then((res: IQueryResponse) => {
          if (res.total === 1) {
            this.setState({
              options: res.data,
              value: res.data[0],
              loading: false,
            })
          } else {
            this.setState({ options: res.data, loading: false })
          }
        })
    }
  }

  selected = (event: any, value: any) => {
    this.props.selectedObject(value, this.props.id || '')
    this.setState({ value })
  }

  onChange = async (event: object, selectedObject: string, reason: string) => {
    try {
      if (reason === 'reset') {
        this.setState({ inputValue: selectedObject })
        this.selected(event, this.state.value)
        return
      }
      if (this.props._aggregate) {
        this.props.service
          .find({
            query: {
              _aggregate: JSON.stringify(this.props._aggregate),
            },
          })
          .then((res: IQueryResponse) => {
            this.setState({ options: res, loading: false })
          })
      }
      else if (this.props.limit === -1 && !this.props._aggregate) {
        this.setState({ loading: true, inputValue: selectedObject })
        const res: IQueryResponse = await this.props.service.find({
          query: {
            $limit: this.props.limit,
            $sort: {
              [this.props.sortProperty
                ? this.props.sortProperty
                : this.props.property]: 1,
            },
            ...this.props.filterParams,
          },
        })
        this.setState({ options: res, loading: false })
      } else if (reason === 'clear') {
        this.setState({ loading: true, inputValue: selectedObject })
        const res: IQueryResponse = await this.props.service.find({
          query: {
            $limit: this.props.limit,
            $sort: {
              [this.props.sortProperty
                ? this.props.sortProperty
                : this.props.property]: 1,
            },
            ...this.props.filterParams,
          },
        })
        this.setState({ options: res.data, loading: false })
      } else {
        this.setState({ loading: true, inputValue: selectedObject })
        const res: IQueryResponse = await this.props.service.find({
          query: {
            [this.props.property]: {
              $regex: '(?i)' + selectedObject + '(?-i)',
            },
            $limit: this.props.limit,
            $sort: {
              [this.props.sortProperty
                ? this.props.sortProperty
                : this.props.property]: 1,
            },
            ...this.props.filterParams,
          },
        })
        this.setState({ options: res.data, loading: false })
      }
    } catch (error) {
      showErrorMessage({
        message: t(
          'Servislerden veri istenirken bir problem ile karışılaşıldı.'
        ),
        description: error.message,
      })
    }
  }

  error: any = {}

  state: any = {
    open: false,
    loading: true,
    selectedItem: undefined,
  }

  render() {
    // TODO: Add loading
    // if (this.state.loading) {
    //   return <Loader loaded={false} onlySpinner={true} />;
    // }
    return (
      <Autocomplete
        //style={{ width: this.props.width ?? 300 }}
        fullWidth
        open={this.state.open}
        loading={this.state.loading}
        loadingText={t('Yükleniyor...')}
        onOpen={() => {
          this.setState({ open: true })
        }}
        onClose={() => {
          this.setState({ open: false })
        }}
        disabled={this.props.disabled}
        isOptionEqualToValue={(option, value) =>
          option[this.props.property] === value[this.props.property]
        }
        value={this.state.value}
        inputValue={this.state.inputValue || ''}
        getOptionLabel={option => option[this.props.property] || ''}
        options={this.state.options || []}
        onChange={(event, value) => {
          this.selected(event, value)
        }}
        onInputChange={this.onChange}
        renderInput={params => (
          <TextField
            {...params}
            label={this.props.label}
            fullWidth
            error={this.props.error || false}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.state.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    )
  }
}
export default Component
